// Mock data store
let templateStore = [
  {
    id: 'travel-templates',
    title: 'Travel Templates',
    items: [
      {
        id: 'travel-blog-post',
        title: 'Travel Blog Post',
        content: `<article class="travel-post">
  <h1>{{Post.Title}}</h1>
  <div class="post-meta">
    <span class="author">By {{Author.Name}}</span>
    <span class="date">Published on {{Post.Date}}</span>
    <span class="category">{{Post.Category}}</span>
  </div>
  <div class="post-content">
    {{mce-cursor}}
    <h2>Overview</h2>
    <p>Your travel experience goes here...</p>
    <h2>Must-See Attractions</h2>
    <ul>
      <li>Attraction 1</li>
      <li>Attraction 2</li>
      <li>Attraction 3</li>
    </ul>
    <h2>Travel Tips</h2>
    <p>Share your insider tips here...</p>
  </div>
  <div class="post-footer">
    <div class="tags">
      Tags: {{Post.Tags}}
    </div>
  </div>
</article>`
      },
      {
        id: 'quick-travel-tip',
        title: 'Quick Travel Tip',
        content: `<div class="travel-tip">
  <h3>💡 Quick Tip: {{mce-cursor}}</h3>
  <p>Your travel tip details here...</p>
  <div class="tip-meta">
    <span class="location">📍 Location: {{Location}}</span>
    <span class="category">🏷️ Category: {{Category}}</span>
  </div>
</div>`
      }
    ]
  },
  {
    id: 'content-blocks',
    title: 'Content Blocks',
    items: [
      {
        id: 'photo-gallery',
        title: 'Photo Gallery',
        content: `<div class="photo-gallery">
  <h2>Photo Gallery: {{Gallery.Title}}</h2>
  <div class="gallery-grid">
    {{mce-cursor}}
    <figure class="gallery-item">
      <img src="{{Photo1.URL}}" alt="{{Photo1.Description}}">
      <figcaption>{{Photo1.Caption}}</figcaption>
    </figure>
  </div>
</div>`
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
