import { AnyObject } from '@core/types';
import { Button, Col, Input, Row, Select } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { CSSProperties, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ComponenteProps {
  loading?: boolean;
  tipo?: ButtonType;
  desabilitado?: boolean;
  href?: string;
  permissoes?: Array<string>;
  children?: React.ReactNode;
  onClick?: () => void;
  block?: boolean;
  mostrarTextoSeSemPermissao?: boolean;
  style?: CSSProperties | undefined;
  icon?: React.ReactNode;
};

export const BotaoOuTextoPorPermissaoComponente: FC<ComponenteProps> = ({
  loading = false,
  tipo = 'default',
  desabilitado = false,
  href = undefined,
  permissoes = [],
  onClick,
  block = true,
  mostrarTextoSeSemPermissao = true,
  style,
  icon,
  children,
}) => {
  const navigate = useNavigate();
  // const { keycloak } = useKeycloak();
  // if (!keycloak?.authenticated) {
  //   return (<></>);
  // }

  // const authRoles = keycloak?.tokenParsed?.roles as Array<string>;
  // const re = permissoes.filter(p => authRoles.findIndex(x => x === p) >= 0);

  // if (!re.length && !mostrarTextoSeSemPermissao) {
  //   return (<></>);
  // }

  // if (!re.length) {
  //   return (<>{children}</>);
  // }

  const handleOnClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (href && href !== '') {
      navigate(href);
      return;
    }
  };

  return (
    <Button
      icon={icon}
      loading={loading}
      block={block}
      onClick={handleOnClick}
      disabled={desabilitado || loading}
      type={tipo}
      style={style}
    >
      {children}
    </Button>
  );
};
