import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsBlogGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_grids';
  info: {
    displayName: 'BlogGrid';
  };
  attributes: {
    blogs: Schema.Attribute.Relation<'oneToMany', 'api::blog.blog'>;
  };
}

export interface SectionsProductShowcase extends Struct.ComponentSchema {
  collectionName: 'components_sections_product_showcases';
  info: {
    displayName: 'ProductShowcase';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.blog-grid': SectionsBlogGrid;
      'sections.product-showcase': SectionsProductShowcase;
    }
  }
}
