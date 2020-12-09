import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const hexColor: { [key: string]: string } = {
  ORANGE: '#ffa500',
  BLUE: '#0000ff',
  GREY: '#808080',
  LIGHT_GREY: '#d3d3d3',
  LIME: '#bfff00',
  GREEN: '#008000',
  YELLOW: '#ffff00',
  AZURE: '#00bfff',
};

interface LegoItem {
  color: string;
  size: string;
}

export default ({ legoInfo }: { legoInfo: string }) => {
  const [legoData, setLegoData] = useState([{} as LegoItem]);

  useEffect(() => {
    if (legoInfo != null) {
      const data: LegoItem[] = parseLego(legoInfo);
      setLegoData(data);
    }
  }, [legoInfo]);

  const parseLego = (legoString: string): LegoItem[] => {
    legoString = legoString.substring(0, legoString.length - 1);
    const legoArr: string[] = legoString.split(';');
    const processed: string[][] = legoArr.map(lego => lego.split(','));
    const final: LegoItem[] = processed.map(lego => {
      const legoObj = {
        color: lego[0],
        size: `${lego[1]}x${lego[2]}`,
      };
      return legoObj;
    });
    return final;
  };

  const renderList = ({ color, size }: { color: string; size: string }) => (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar style={{ backgroundColor: hexColor[color] }} />}
        title={color}
        description={size}
      />
    </List.Item>
  );

  return <List dataSource={legoData} renderItem={renderList} />;
};
