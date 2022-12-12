import { AnyObject } from '@core/types';
import { Button, Col, Divider, Input, Row, Select } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { CSSProperties, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

interface ComponenteProps {
  loading?: boolean;
  visualizacao?: boolean;
  loadingNewItem?: boolean;
  allowClear?: boolean;
  style?: CSSProperties | undefined;
  desabilitado?: boolean;
  placeholder?: string;
  permissoesAdicionar?: Array<string>;
  children?: React.ReactNode;
  onNewItemClick?: (value?: string) => void;
  onSelected?: (value?: string) => void;
  listaItens?: Array<AnyObject>;
  permitirAdicionar?: boolean;
  placeholderCampoAdicionar?: string;
  valuePropName?: string;
  textPropName?: string;
  valorSelecionado?: string;
  renderVisualizacao?: (valorSelecionado?: string) => string;
};

export const SelectOuTextoPorVisualizacaoComponente: FC<ComponenteProps> = ({
  loading = false,
  loadingNewItem = false,
  visualizacao = false,
  desabilitado = false,
  allowClear = false,
  valorSelecionado = undefined,
  placeholder,
  permissoesAdicionar = [],
  listaItens = [],
  onNewItemClick,
  onSelected,
  style,
  permitirAdicionar = false,
  children,
  placeholderCampoAdicionar,
  valuePropName = 'value',
  textPropName = 'text',
  renderVisualizacao,
}) => {
  const [novoRegistroValor, setNovoRegistroValor] = useState<string>('');

  // const { keycloak } = useKeycloak();
  // if (!keycloak?.authenticated) {
  //   return (<></>);
  // }

  if (visualizacao) {
    return (
      <>
        <Input
          readOnly={true}
          placeholder={placeholder}
          value={loading ? 'Carregando' : renderVisualizacao ? renderVisualizacao(valorSelecionado) : (valorSelecionado ?? '')}
        />
      </>
    );
  }

  // const authRoles = keycloak?.tokenParsed?.roles as Array<string>;
  // const re = permissoesAdicionar.filter(p => authRoles.findIndex(x => x === p) >= 0);

  const handleNovoRegistroValorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNovoRegistroValor(event.target.value);
  };

  const handleNovoRegistroClick = () => {
    setNovoRegistroValor('');
    onNewItemClick?.(novoRegistroValor);
  };

  const renderAdicionarRegistro = () => {
    // if (!permitirAdicionar || !re.length) {
    //   return (<></>);
    // }
    return (
      <>
        <Divider style={{ margin: '8px 0' }} />
        <Row gutter={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
          <Col span={18}>
            <Input
              disabled={loadingNewItem}
              value={novoRegistroValor}
              placeholder={placeholderCampoAdicionar}
              onChange={handleNovoRegistroValorChange}
            />
          </Col>
          <Col span={6}>
            <Button
              disabled={!novoRegistroValor || novoRegistroValor === '' || loadingNewItem}
              block
              type='text'
              icon={<PlusOutlined />}
              loading={loadingNewItem}
              onClick={handleNovoRegistroClick}
            >
              Adicionar
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  const handleSelectChange = (value?: string) => {
    onSelected?.(value);
  };

  return (
    <Select
      disabled={loading || desabilitado}
      allowClear={allowClear}
      style={style ?? { width: '100%' }}
      placeholder={placeholder ?? 'Selecione'}
      loading={loading}
      value={valorSelecionado}
      onChange={handleSelectChange}
      dropdownRender={menu => (
        <>
          {menu}
          {renderAdicionarRegistro()}
        </>
      )}
    >
      {listaItens && listaItens.map((item, index) => (
        <Select.Option
          key={`option-${valuePropName ? item[valuePropName] : index}`}
          value={valuePropName ? item[valuePropName] : item}
        >
          {textPropName ? item[textPropName] : item}
        </Select.Option>
      ))}
      {children}
    </Select>
  );
};
