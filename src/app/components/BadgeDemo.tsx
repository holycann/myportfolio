import Badge from '@/components/ui/badge';
import React from 'react';

const BadgeDemo: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Badge Variants</h2>
      
      <div className="space-x-2">
        <Badge>Default Badge</Badge>
        <Badge variant="primary">Primary Badge</Badge>
        <Badge variant="secondary">Secondary Badge</Badge>
        <Badge variant="success">Success Badge</Badge>
        <Badge variant="warning">Warning Badge</Badge>
        <Badge variant="danger">Danger Badge</Badge>
        <Badge variant="info">Info Badge</Badge>
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">Outline Badge Variants</h2>
      <div className="space-x-2">
        <Badge variant="outline-default">Default Outline</Badge>
        <Badge variant="outline-primary">Primary Outline</Badge>
        <Badge variant="outline-secondary">Secondary Outline</Badge>
        <Badge variant="outline-success">Success Outline</Badge>
        <Badge variant="outline-warning">Warning Outline</Badge>
        <Badge variant="outline-danger">Danger Outline</Badge>
        <Badge variant="outline-info">Info Outline</Badge>
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">Badge Sizes</h2>
      <div className="space-x-2">
        <Badge size="sm">Small Badge</Badge>
        <Badge size="md">Medium Badge</Badge>
        <Badge size="lg">Large Badge</Badge>
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">Badge Rounded</h2>
      <div className="space-x-2">
        <Badge rounded="none">No Rounded</Badge>
        <Badge rounded="sm">Small Rounded</Badge>
        <Badge rounded="md">Medium Rounded</Badge>
        <Badge rounded="lg">Large Rounded</Badge>
        <Badge rounded="full">Full Rounded</Badge>
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">Custom Badge</h2>
      <div className="space-x-2">
        <Badge 
          variant="primary" 
          size="lg" 
          rounded="full" 
          className="bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Custom Badge
        </Badge>
        <Badge 
          asChild
        >
          <a href="#" className="bg-orange-500 text-white px-4 py-2 rounded-md">
            Badge as Link
          </a>
        </Badge>
      </div>
    </div>
  );
};

export default BadgeDemo; 