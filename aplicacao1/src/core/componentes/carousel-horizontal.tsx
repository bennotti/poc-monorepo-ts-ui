import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import { Component } from 'react';
import Slider from 'react-slick';

export default class CarouselHorizontal extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <Card>
              <Statistic
                title='Active1'
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='%'
              />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic
                title='Active2'
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='%'
              />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic
                title='Active3'
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='%'
              />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic
                title='Active4'
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='%'
              />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic
                title='Active5'
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='%'
              />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic
                title='Active6'
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='%'
              />
            </Card>
          </div>
        </Slider>
      </div>
    );
  }
}
