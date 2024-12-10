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
  advtemplate_templates,
} from './template_functions';

import { ai_request } from './ai_functions';
import { currentUser } from './servergen';
import { mentions_fetch, mentions_menu_hover, mentions_menu_complete, mentions_select, tinycomments_can_resolve } from './comments_functions';


export default function TinyEditor({ editorRef }) {
  return (
    <>
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'advcode tinycomments mentions advtemplate ai anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown',
        toolbar: 'addtemplate inserttemplate | aidialog aishortcuts | undo redo | addcomment showcomments | blocks fontfamily fontsize | bold italic underline strikethrough | code link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
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
        advtemplate_templates,
        ai_request,
      }}
      initialValue=""
    />
    </>
  );
}