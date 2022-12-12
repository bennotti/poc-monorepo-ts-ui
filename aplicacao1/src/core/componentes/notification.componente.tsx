import { notification } from 'antd';

export const successNotification = (
  mensagem: string,
  titulo = 'Executado com sucesso!'
) => {
  notification['success']({
    message: titulo,
    description: mensagem,
  });
};

export const errorNotification = (mensagem: string, titulo = 'Atenção!') => {
  notification['error']({
    message: titulo,
    description: mensagem,
  });
};

export const infoNotification = (mensagem: string, titulo = 'Informação') => {
  notification['info']({
    message: titulo,
    description: mensagem,
  });
};
