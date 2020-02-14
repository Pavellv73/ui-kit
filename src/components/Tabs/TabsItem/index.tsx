import React from 'react';

import './styles.css';

export type TabItemProps = {
  content: string;
  isActive?: boolean;
  className?: string;
};

const TabItem: React.FC<TabItemProps> = ({ content, className }) => {
  return <div className={className}>{content}</div>;
};

export default TabItem;