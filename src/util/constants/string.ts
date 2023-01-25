export const DICTIONARY = {
  RESPONSE: {
    MESSAGE: {
      OK: "Sucesso.",
      BAD_REQUEST: "Por favor, valide os dados e tente novamente.",
      UNAUTHORIZED: "Você não tem permissão para acessar esse conteúdo.",
      INTERNAL_SERVER_ERROR:
        "Ops. Ocorreu um erro em nossos servidores. Tente novamente mais tarde.",
      NOT_FOUND: "{value} não encontrado(a).",
      NONE_WAS_FOUND: "Nenhum {value} foi encontrado.",
      UNPROCESSABLE: "Não foi possível processar a requisição",
      LOCALS: {
        PRODUTOS: "Produtos consultados com sucesso.",
      },
    },

    DESCRIPTION: {
      INTERNAL_SERVER_ERROR: "Ocorreu um erro em nossos servidores",
      UNAUTHORIZED:
        "Falha ao autenticar. O Authorization fornecido é inválido ou está expirado",
    },
  },
  YUP: {
    REQUIRED: "{value} é obrigatório(a).",
    MIN_STRING: "{value} precisa ter no mínimo {min} caracteres",
    MIN_NUMBER: "{value} não pode ser menor que o número {min}",
  },
};
