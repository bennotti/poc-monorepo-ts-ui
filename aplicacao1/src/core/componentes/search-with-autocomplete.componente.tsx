import { AnyObject } from '@core/types';
import { Button, Col, Input, Row, Select } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { FC, useEffect, useState } from 'react';

interface ComponenteProps {
  type?: 'input' | 'select';
  placeholder?: string;
  data?: Array<AnyObject>;
  onSelecionado?: (valor?: string) => void;
  valor?: string;
  textoBotao?: string;
  onSelectSearch?: (valor?: string) => void;
  onValueChange?: (valor?: string) => void;
  tipoBotao?: ButtonType;
};

export const SearchWithAutocompleteComponente: FC<ComponenteProps> = ({
  type = 'input',
  placeholder,
  data = [],
  onSelecionado,
  valor = undefined,
  textoBotao = 'Procurar',
  onSelectSearch,
  onValueChange,
  tipoBotao = 'default',
}) => {
  const [valorInterno, setValorInterno] = useState<string | undefined>(valor);

  useEffect(() => {
    if (valor != valorInterno) {
      setValorInterno(valor);
    }
  }, []);

  const handleSearch = (newValue: string) => {
    onSelectSearch?.(newValue);
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
    // setValor(newValue);
    onSelecionado?.(newValue);
  };

  const handleSelecionarClick = () => {
    onSelecionado?.(valorInterno);
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setValorInterno(value);
    onValueChange?.(value);
  };

  const options = data.map(d => (<Select.Option key={d.value}>{d.text}</Select.Option>));
  
  const procurarButton = () => {
    return (
      <Col span={4}>
        <Button
          type={tipoBotao}
          block
          onClick={handleSelecionarClick}>
            {textoBotao}
          </Button>
      </Col>
    );
  };

  if (!type || type === 'input') {
    return (
      <Row gutter={0}>
        <Col span={20}>
          <Input
            value={valorInterno}
            allowClear
            placeholder={placeholder}
            onChange={handleInputChange}
          />
        </Col>
        {procurarButton()}
      </Row>
    );
  }
  return (
    <Row gutter={0}>
      <Col span={20}>
        <Select
          allowClear
          value={valorInterno}
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
      {procurarButton()}
    </Row>
  );
};
