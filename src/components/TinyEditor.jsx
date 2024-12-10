import { Editor } from '@tinymce/tinymce-react';

import {
  advtemplate_list,
  advtemplate_get_template,
  advtemplate_create_category,
  advtemplate_create_template,
  advtemplate_rename_category,
  advtemplate_rename_template,
  advtemplate_delete_template,
  advtemplate_delete_category,
  advtemplate_move_template,
  advtemplate_move_category_items,
} from './template_functions';

import { ai_request } from './ai_functions';
import { currentUser } from './servergen';
import { mentions_fetch, mentions_menu_hover, mentions_menu_complete, mentions_select, tinycomments_can_resolve } from './comments_functions';

import '../styles/mergetags.css';

export default function TinyEditor({ editorRef }) {
  return (
    <>
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      initialValue=""
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'advcode tinycomments mentions advtemplate ai anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown mergetags',
        toolbar: 'mergetags | inserttemplate addtemplate | aidialog aishortcuts | undo redo | addcomment showcomments | blocks fontfamily fontsize | bold italic underline strikethrough | code link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        menu: {
          tc: {
            title: 'TinyComments',
            items: 'addcomment showcomments deleteallconversations'
          }
        },

        height: 800,
        advcode_inline: true,
        tinycomments_mentions_enabled: true,
        readonly: true,
        mentions_item_type: 'profile',
        mentions_min_chars: 0,
        mentions_selector: '.mymention',
        mentions_fetch,
        mentions_menu_hover,
        mentions_menu_complete,
        mentions_select,
        

        tinycomments_author: currentUser.id,
        tinycomments_author_name: currentUser.fullName,
        tinycomments_avatar: currentUser.image,
        tinycomments_mode: 'embedded',
        sidebar_show: 'showcomments',
        tinycomments_can_resolve,

        contextmenu: 'advtemplate',
        advtemplate_list,
        advtemplate_get_template,
        advtemplate_create_category,
        advtemplate_create_template,
        advtemplate_rename_category,
        advtemplate_rename_template,
        advtemplate_delete_template,
        advtemplate_delete_category,
        advtemplate_move_template,
        advtemplate_move_category_items,
        ai_request,

        mergetags_prefix: '{{',
        mergetags_suffix: '}}',
        mergetags_list: [
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
        ],
        content_css: '/src/styles/mergetags.css',
        content_style: `
          .mce-content-body .mce-mergetag:hover {
            background-color: rgba(0, 108, 231, .1);
            border-radius: 3px;
          }
          
          .mce-content-body .mce-mergetag-affix {
            background-color: rgba(0, 108, 231, .1);
            color: #006ce7;
            border-radius: 3px;
            font-family: monospace;
            padding: 0 2px;
          }
        `,
      }}
    />
    </>
  );
}