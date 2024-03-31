import type { Schema, Attribute } from '@strapi/strapi';

export interface FeaturePropertyFeature extends Schema.Component {
  collectionName: 'components_feature_property_features';
  info: {
    displayName: 'propertyFeature';
  };
  attributes: {};
}

export interface PropertyFeaturePropertyFeature extends Schema.Component {
  collectionName: 'components_property_feature_property_features';
  info: {
    displayName: 'propertyFeature';
    description: '';
  };
  attributes: {
    feature: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'feature.property-feature': FeaturePropertyFeature;
      'property-feature.property-feature': PropertyFeaturePropertyFeature;
    }
  }
}
