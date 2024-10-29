import { getId } from './Storage';

export const fetchUserId = async () => {
  const id = await getId();
  return id;
};

// Função para pegar um atributo específico do usuário
const getUserData = async (id, property) => {
  try {
    const response = await fetch(`https://conectamaes-api.glitch.me/getUserProperty/${id}/${property}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.length > 0 && result[0][property]) { // Verifica se há um item no array e se a propriedade existe
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




// Funções de exportação para buscar atributos específicos
export const getUserFullName = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'nomeCompleto');
};

export const getUsername = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'nomeDeUsuario');
};

export const getUserEmail = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'email');
};

export const getUserPassword = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'senha');
};

export const getUserPhone = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'telefone');
};

export const getUserBio = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'biografia');
};

export const getUserState = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'estado');
};

export const getUserBirthdate = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'dataNascimentoUsuario');
};

export const getUserTheme = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'tema');
};

export const verifyAdmin = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'isAdmin');
};

export const getUserProfilePicture = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'linkFotoPerfil');
};

export const getUserPix = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'chavePix');
};

export const getUserCreationDate = async () => {
  const id = await fetchUserId();
  return await getUserData(id, 'dataCriacaoUsuario');
};

// Função para pegar todos os dados do usuário
export const getUser = async () => {
  try {
    const id = await fetchUserId(); // Pega o ID do usuário apenas uma vez

    const [
      fullName,
      username,
      email,
      password,
      phone,
      bio,
      state,
      birthdate,
      theme,
      isAdmin,
      profilePicture,
      pix,
      creationDate,
    ] = await Promise.all([
      getUserFullName(id),
      getUsername(id),
      getUserEmail(id),
      getUserPassword(id),
      getUserPhone(id),
      getUserBio(id),
      getUserState(id),
      getUserBirthdate(id),
      getUserTheme(id),
      verifyAdmin(id),
      getUserProfilePicture(id),
      getUserPix(id),
      getUserCreationDate(id),
    ]);

    return {
      fullName,
      username,
      email,
      password,
      phone,
      bio,
      state,
      birthdate,
      theme,
      isAdmin,
      profilePicture,
      pix,
      creationDate,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Ou lidar com o erro de outra forma
  }
};
