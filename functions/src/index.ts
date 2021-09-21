import * as functions from "firebase-functions";
const admin = require("firebase-admin");

const axios = require("axios");

admin.initializeApp();

const ensureUserIsLoggedIn = (context: functions.https.CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated", "O usuário deve estar autenticado"
    );
  }
};

const ensureCompanyIsNew = async (cnpj: string) => {
  const companySnap = await admin.firestore().doc(`empresas/${cnpj}`).get();
  if (companySnap.exists) {
    throw new functions.https.HttpsError(
        "failed-precondition", "CNPJ já foi cadastrado"
    );
  }
};

exports.consultCNPJ = functions.https.onCall(async (data, context) => {
  ensureUserIsLoggedIn(context);
  await ensureCompanyIsNew(data);

  const args = {
    cnpj: data,
    origem: "web",
    token: "9GkD2emIw0y81jBea7s_UMT2TYuGJoQCSu0uMhYj",
    timeout: 300,
  };
  const result = await axios.post(
      "https://api.infosimples.com/api/v1/receita-federal/cnpj.json",
      args
  );
  if (result.status === 200) {
    const companyData = result.data.data;
    return {status: 200, body: companyData};
  } else {
    return {status: 400, error: "Não foi possível retornar dados desse CNPJ"};
  }
});


exports.createCompany = functions.https.onCall(async (data, context) => {
  ensureUserIsLoggedIn(context);
  await ensureCompanyIsNew(data.cnpj);

  const companyData = {
    cnpj: data.cnpj,
    nome_fantasia: data.nome_fantasia,
    razao_social: data.razao_social,
    cep: data.cep,
    numero: data.numero,
    atividades: data.atividades,
    cnaes: data.cnaes,
  };
  const company = await admin.firestore()
      .doc(`empresas/${data.cnpj}`)
      .set(companyData);
  await admin.auth().setCustomUserClaims(context.auth?.uid, {
    company: data.cnpj,
  });
  return {status: 200, body: company};
});

exports.searchCNPJ = functions.https.onCall(async (data, context) => {
  const result = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${data.cnpj}`);
  if (result.status === 200) {
    return {status: 200, body: result.data};
  } else {
    return {status: 400, error: "Não foi possível retornar dados desse CNPJ"};
  }
});

exports.createUser = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().doc(`users/${user.uid}`).set({
    phoneNumber: user.phoneNumber,
    email: user.email,
    emailVerified: user.emailVerified,
  }, {merge: true});

  // await admin.auth().setCustomUserClaims(user.uid, {});
});

exports.deleteUser = functions.auth.user().onDelete(async (user, context) => {
  const cnpj = user.customClaims?.company;
  const token = context.auth?.token;
  const headers = {"Authorization": `Bearer ${token}`};
  if (cnpj) {
    const result = await axios.delete(`https://api-dev.negociosimples.com.br/api/companies/${cnpj}`, {headers: headers});
    if (result.status === 204) {
      return {status: 204, body: result.data};
    } else {
      return {status: 400, error: "Não foi possível retornar dados desse CNPJ"};
    }
  } else {
    return {status: 404, error: "Não foi possível retornar dados desse CNPJ"};
  }
});
