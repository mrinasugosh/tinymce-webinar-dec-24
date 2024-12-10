import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor({ editorRef }) {
  return (
    <>
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      initialValue=""
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'code anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown mergetags',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | code link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',

        height: 800,
      }}
    />
    </>
  );
}