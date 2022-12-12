import { AnyObject } from '@core/types';
import { Button, Col, Input, Row, Select } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { FC, useState } from 'react';

interface ComponenteProps {
  placeholder?: string;
  data?: Array<AnyObject>;
  onSelecionado?: (valor?: string) => void;
  valorSelecionado?: string;
  textoBotao?: string;
  onSearch?: (valor?: string) => void;
  tipoBotao?: ButtonType;
};

export const AutocompleteSelecionarComponente: FC<ComponenteProps> = ({
  placeholder,
  data = [],
  onSelecionado,
  valorSelecionado = undefined,
  textoBotao = 'Procurar',
  onSearch,
  tipoBotao = 'default',
}) => {
  const [valor, setValor] = useState<string | undefined>(valorSelecionado);
  const handleSearch = (newValue: string) => {
    onSearch?.(newValue);
    // console.log('handleSearch', newValue);
    // if (newValue) {
    //   // fetch(newValue, setData);
    // } else {
    //   // setData([]);
    // }
  };

  const handleChange = (newValue: string) => {
    // console.log('handleChange', newValue);
    // chamado quando selecionado
    setValor(newValue);
    onSelecionado?.(newValue);
  };

  const handleSelecionarClick = () => {
    onSelecionado?.(valor);
  };

  const options = data.map(d => (<Select.Option key={d.value}>{d.text}</Select.Option>));
  return (
    <Row gutter={0}>
      <Col span={22}>
        <Select
          allowClear
          value={valorSelecionado}
          showSearch //width: 'calc(100% - 100px)',
          placeholder={placeholder}
          style={{ width: '100%', textAlign: 'left' }}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
        >
          {options}
        </Select>
      </Col>
      <Col span={2}>
        <Button type={tipoBotao} block onClick={handleSelecionarClick}>{textoBotao}</Button>
      </Col>
    </Row>
  );
};
