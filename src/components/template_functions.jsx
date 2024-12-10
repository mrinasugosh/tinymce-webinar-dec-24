const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  export const advtemplate_templates = [
    {
      title: 'Quick replies',
      items: [
        {
          title: 'Message received',
          content: '<p dir="ltr">Hey {{Customer.FirstName}}!</p>\n<p dir="ltr">Just a quick note to say we&rsquo;ve received your message, and will get back to you within 48 hours.</p>\n<p dir="ltr">For reference, your ticket number is: {{Ticket.Number}}</p>\n<p dir="ltr">Should you have any questions in the meantime, just reply to this email and it will be attached to this ticket.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Regards,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
        },
        {
          title: 'Thanks for the feedback',
          content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We appreciate you taking the time to provide feedback on {{Product.Name}}.</p>\n<p dir="ltr">It sounds like it wasn&rsquo;t able to fully meet your expectations, for which we apologize. Rest assured our team looks at each piece of feedback and uses it to decide what to focus on next with {{Product.Name}}.</p>\n<p dir="ltr"><strong>&nbsp;</strong></p>\n<p dir="ltr">All the best, and let us know if there&rsquo;s anything else we can do to help.</p>\n<p dir="ltr">-{{Agent.FirstName}}</p>'
        },
        {
          title: 'Still working on case',
          content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">Just a quick note to let you know we&rsquo;re still working on your case. It&rsquo;s taking a bit longer than we hoped, but we&rsquo;re aiming to get you an answer in the next 48 hours.</p>\n<p dir="ltr">Stay tuned,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
        }
      ]
    },
    {
      title: 'Closing tickets',
      items: [
        {
          title: 'Closing ticket',
          content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We haven&rsquo;t heard back from you in over a week, so we have gone ahead and closed your ticket number {{Ticket.Number}}.</p>\n<p dir="ltr">If you&rsquo;re still running into issues, not to worry, just reply to this email and we will re-open your ticket.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">All the best,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
        },
        {
          title: 'Post-call survey',
          content: '<p dir="ltr">Hey {{Customer.FirstName}}!</p>\n<p dir="ltr">&nbsp;</p>\n<p dir="ltr">How did we do?</p>\n<p dir="ltr">If you have a few moments, we&rsquo;d love you to fill out our post-support survey: {{Survey.Link}}</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks in advance!<br>{{Company.Name}} Customer Support</p>'
        }
      ]
    },
    {
      title: 'Product support',
      locked:true,
      items: [
        {
          title: 'How to find model number',
          content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">My name is {{Agent.FirstName}} and I will be glad to assist you today.</p>\n<p dir="ltr">To troubleshoot your issue, we first need your model number, which can be found on the underside of your product beneath the safety warning label.&nbsp;</p>\n<p dir="ltr">It should look something like the following: XX.XXXXX.X</p>\n<p dir="ltr">Once you send it over, I will advise on next steps.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks!</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
        },
        {
          title: 'Support escalation',
          content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We have escalated your ticket {{Ticket.Number}} to second-level support.</p>\n<p dir="ltr">You should hear back from the new agent on your case, {{NewAgent.FirstName}}, shortly.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks,</p>\n<p dir="ltr">{{Company.Name}} Customer Support</p>'
        }
      ]
    }
  ];
  
  const handleResponse = (message) => (response) => {
    if (!response.ok) {
      return response.text().then((error) => {
        console.error(error);
        throw new Error(message);
      });
    }
    return response.json();
  };
  
  export const advtemplate_list = () =>
    fetch('/categories', {
      method: 'GET',
      headers,
    }).then(handleResponse('Failed to get template list'));
  
  export const advtemplate_get_template = (id) =>
    fetch(`/templates/${id}`, {
      method: 'GET',
      headers,
    }).then(handleResponse('Failed to get template'));
  
  export const advtemplate_create_category = (title) =>
    fetch('/categories', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers,
    }).then(handleResponse('Failed to create category'));
  
  export const advtemplate_create_template = (title, content, categoryId) =>
    fetch('/templates', {
      method: 'POST',
      body: JSON.stringify({ title, content, categoryId }),
      headers,
    }).then(handleResponse('Failed to create template'));
  
  export const advtemplate_rename_category = (id, title) =>
    fetch(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title }),
      headers,
    }).then(handleResponse('Failed to rename category'));
  
  export const advtemplate_rename_template = (id, title) =>
    fetch(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title }),
      headers,
    }).then(handleResponse('Failed to rename template'));
  
  export const advtemplate_delete_template = (id) =>
    fetch(`/templates/${id}`, {
      method: 'DELETE',
      headers,
    }).then(handleResponse('Failed to delete template'));
  
  export const advtemplate_delete_category = (id) =>
    fetch(`/categories/${id}`, {
      method: 'DELETE',
      headers,
    }).then(handleResponse('Failed to delete category'));
  
  export const advtemplate_move_template = (id, categoryId) =>
    fetch(`/templates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ categoryId }),
      headers,
    }).then(handleResponse('Failed to move template'));
  
  export const advtemplate_move_category_items = (id, categoryId) =>
    fetch(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ categoryId }),
      headers,
    }).then(handleResponse('Failed to move all templates to new category'));
  