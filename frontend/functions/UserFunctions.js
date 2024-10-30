import { getId, getToken } from './Storage';

export const fetchUserId = async () => {
  const id = await getId();
  return id;
};

export const fetchUserToken = async () => {
  const token = await getToken();
  return token;
};

// Função para pegar um atributo específico do usuário
const getUserData = async (id, property, token) => {
  try {
    const response = await fetch(
      `https://conectamaes-api.glitch.me/getUserProperty/${id}/${property}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: token,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      if (result.length > 0 && result[0][property]) {
        // Verifica se há um item no array e se a propriedade existe
        return result[0][property].toString() || ''; // Converte o valor para string ou retorna vazio
      } else {
        console.error('Propriedade não encontrada na resposta:', result);
        return '';
      }
    } else {
      console.error('Erro ao buscar atributo:', response.status);
      return '';
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return '';
  }
};

export const getUserFullName = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken();
  return await getUserData(id, 'nomeCompleto', token);
};

export const getUsername = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken();
  return await getUserData(id, 'nomeDeUsuario', token);
};

export const getUserEmail = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'email', token);
};

export const getUserPassword = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'senha', token);
};

export const getUserPhone = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'telefone', token);
};

export const getUserBio = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'biografia', token);
};

export const getUserState = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'estado', token);
};

export const getUserBirthdate = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'dataNascimentoUsuario', token);
};

export const getUserTheme = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'tema', token);
};

export const verifyAdmin = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'isAdmin', token);
};

export const getUserProfilePicture = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'linkFotoPerfil', token);
};

export const getUserPix = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'chavePix', token);
};

export const getUserCreationDate = async () => {
  const id = await fetchUserId();
  const token = await fetchUserToken(); // Adicionei o token aqui
  return await getUserData(id, 'dataCriacaoUsuario', token);
};
