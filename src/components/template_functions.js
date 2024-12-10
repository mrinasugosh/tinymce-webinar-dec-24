// Mock data store
let templateStore = [
  {
    id: 'reusable-content-blocks',
    title: 'Reusable Content Blocks',
    locked: true,
    items: [
      {
        id: 'header-block',
        title: 'Header Block',
        content: `<header>
  <h1>{{Site.Title}}</h1>
  <p>{{Site.Tagline}}</p>
</header>`
      },
      {
        id: 'hero-section',
        title: 'Hero Section',
        content: `<section class="hero">
  <div class="hero-content">
    <h1>{{Page.Title}}</h1>
    <p>{{Page.Subtitle}}</p>
    <a href="{{Page.CTA.Link}}" class="btn">{{Page.CTA.Text}}</a>
  </div>
</section>`
      },
      {
        id: 'footer-block',
        title: 'Footer Block',
        content: `<footer>
  <div class="footer-info">
    <p>&copy; {{Current.Year}} {{Site.Name}}. All rights reserved.</p>
    <nav>
      <ul>
        <li><a href="{{Links.PrivacyPolicy}}">Privacy Policy</a></li>
        <li><a href="{{Links.TermsOfService}}">Terms of Service</a></li>
      </ul>
    </nav>
  </div>
</footer>`
      }
    ]
  },
  {
    id: 'content-templates',
    title: 'Content Templates',
    items: [
      {
        id: 'blog-post-template',
        title: 'Blog Post Template',
        content: `<article>
  <h1>{{Post.Title}}</h1>
  <p><em>By {{Author.Name}} on {{Post.Date}}</em></p>
  <div class="post-content">
    {{mce-cursor}}
    {{Post.Content}}
  </div>
</article>`
      },
      {
        id: 'product-page-template',
        title: 'Product Page Template',
        content: `<section class="product-page">
  <h1>{{Product.Name}}</h1>
  <p>{{Product.Description}}</p>
  <div class="product-price">Price: {{Product.Price}}</div>
  <button>Add to Cart</button>
</section>`
      }
    ]
  }
];

export const mergetags_list = [
  {
    title: 'Site',
    menu: [
      {
        value: 'Site.Title',
        title: 'Site Title'
      },
      {
        value: 'Site.Name',
        title: 'Site Name'
      },
      {
        value: 'Site.Tagline',
        title: 'Site Tagline'
      }
    ]
  },
  {
    title: 'Page',
    menu: [
      {
        value: 'Page.Title',
        title: 'Page Title'
      },
      {
        value: 'Page.Subtitle',
        title: 'Page Subtitle'
      },
      {
        value: 'Page.CTA.Link',
        title: 'CTA Link'
      },
      {
        value: 'Page.CTA.Text',
        title: 'CTA Text'
      }
    ]
  },
  {
    title: 'Post',
    menu: [
      {
        value: 'Post.Title',
        title: 'Post Title'
      },
      {
        value: 'Post.Content',
        title: 'Post Content'
      },
      {
        value: 'Post.Date',
        title: 'Post Date'
      },
      {
        value: 'Post.Category',
        title: 'Post Category'
      },
      {
        value: 'Post.Tags',
        title: 'Post Tags'
      }
    ]
  },
  {
    title: 'Author',
    menu: [
      {
        value: 'Author.Name',
        title: 'Author Name'
      }
    ]
  },
  {
    title: 'Product',
    menu: [
      {
        value: 'Product.Name',
        title: 'Product Name'
      },
      {
        value: 'Product.Description',
        title: 'Product Description'
      },
      {
        value: 'Product.Price',
        title: 'Product Price'
      }
    ]
  },
  {
    title: 'Links',
    menu: [
      {
        value: 'Links.PrivacyPolicy',
        title: 'Privacy Policy Link'
      },
      {
        value: 'Links.TermsOfService',
        title: 'Terms of Service Link'
      }
    ]
  },
  {
    title: 'Current',
    menu: [
      {
        value: 'Current.Year',
        title: 'Current Year'
      }
    ]
  }
];

const mockResponse = (data) => Promise.resolve(data);

// Template management functions
export const advtemplate_list = () => mockResponse(templateStore);

export const advtemplate_get_template = (id) => {
  const template = templateStore
    .flatMap(category => category.items)
    .find(template => template.id === id);
  
  if (!template) {
    throw new Error('Template not found');
  }
  return mockResponse(template);
};

export const advtemplate_create_category = (title) => {
  const id = title.toLowerCase().replace(/\s+/g, '-');
  const newCategory = { id, title, items: [] };
  templateStore.push(newCategory);
  return mockResponse({ id, title });
};

export const advtemplate_create_template = (title, content, categoryId) => {
  const category = templateStore.find(cat => cat.id === categoryId);
  if (!category) {
    throw new Error('Category not found');
  }
  
  const id = title.toLowerCase().replace(/\s+/g, '-');
  const newTemplate = { id, title, content };
  category.items.push(newTemplate);
  return mockResponse({ id, title });
};

export const advtemplate_rename_category = (id, newTitle) => {
  const category = templateStore.find(cat => cat.id === id);
  if (!category) {
    throw new Error('Category not found');
  }
  category.title = newTitle;
  return mockResponse({});
};

export const advtemplate_rename_template = (id, newTitle) => {
  for (const category of templateStore) {
    const template = category.items.find(item => item.id === id);
    if (template) {
      template.title = newTitle;
      return mockResponse({});
    }
  }
  throw new Error('Template not found');
};

export const advtemplate_delete_template = (id) => {
  for (const category of templateStore) {
    const index = category.items.findIndex(item => item.id === id);
    if (index !== -1) {
      category.items.splice(index, 1);
      return mockResponse({});
    }
  }
  throw new Error('Template not found');
};

export const advtemplate_delete_category = (id) => {
  const index = templateStore.findIndex(cat => cat.id === id);
  if (index !== -1) {
    templateStore.splice(index, 1);
    return mockResponse({});
  }
  throw new Error('Category not found');
};

export const advtemplate_move_template = (templateId, targetCategoryId) => {
  let template;
  // Find and remove template from source category
  for (const category of templateStore) {
    const index = category.items.findIndex(item => item.id === templateId);
    if (index !== -1) {
      [template] = category.items.splice(index, 1);
      break;
    }
  }
  
  if (!template) {
    throw new Error('Template not found');
  }
  
  // Add template to target category
  const targetCategory = templateStore.find(cat => cat.id === targetCategoryId);
  if (!targetCategory) {
    throw new Error('Target category not found');
  }
  
  targetCategory.items.push(template);
  return mockResponse({});
};

export const advtemplate_move_category_items = (sourceCategoryId, targetCategoryId) => {
  const sourceCategory = templateStore.find(cat => cat.id === sourceCategoryId);
  const targetCategory = templateStore.find(cat => cat.id === targetCategoryId);
  
  if (!sourceCategory || !targetCategory) {
    throw new Error('Category not found');
  }
  
  targetCategory.items.push(...sourceCategory.items);
  sourceCategory.items = [];
  return mockResponse({});
};
