import {getId} from './Storage';

const fetchUserId = async () => {
    const id = await getId();
    return id;
};

// Função para pegar um atributo específico do usuário
const getUserData = async (idUsuario, property) => {
    try {
      const response = await fetch(`https://conectamaes-api.glitch.me/${fetchUserId()}/${property}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        return result[property]?.toString() || ''; // Converte o valor para string ou retorna uma string vazia
      } else {
        console.error('Erro ao buscar atributo:', response.status);
        return '';
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      return '';
    }
  };
  
  const getUserFullName = async (idUsuario) => await getUserData(idUsuario, 'nomeCompleto');
  const getUsername = async (idUsuario) => await getUserData(idUsuario, 'nomeDeUsuario');
  const getUserEmail = async (idUsuario) => await getUserData(idUsuario, 'email');
  const getUserPassword = async (idUsuario) => await getUserData(idUsuario, 'senha');
  const getUserPhone = async (idUsuario) => await getUserData(idUsuario, 'telefone');
  const getUserBio = async (idUsuario) => await getUserData(idUsuario, 'biografia');
  const getUserState = async (idUsuario) => await getUserData(idUsuario, 'estado');
  const getUserBirthdate = async (idUsuario) => await getUserData(idUsuario, 'dataNascimentoUsuario');
  const getUserTheme = async (idUsuario) => await getUserData(idUsuario, 'tema');
  const verifyAdmin = async (idUsuario) => await getUserData(idUsuario, 'isAdmin');
  const getUserProfilePicture = async (idUsuario) => await getUserData(idUsuario, 'linkFotoPerfil');
  const getUserPix = async (idUsuario) => await getUserData(idUsuario, 'chavePix');
  const getUserCreationDate = async (idUsuario) => await getUserData(idUsuario, 'dataCriacaoUsuario');
  

