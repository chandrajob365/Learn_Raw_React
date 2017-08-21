let contacts = [
  {key: 1, name: 'Manish', email: 'chandra.manish645@gmail.com', description: 'JS Intermediate'},
  {key: 2, name: 'Krishna', email: 'krishdxkle@gmail.com', description: 'SQL Expert'},
  {key: 3, name: 'Abhishek'}
]

let newContact = {name: '', email: '', description: ''}

let ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render: function () {
    return (
      React.createElement('li', {className: 'ContactItem'},
        React.createElement('h2', {className: 'ContactItem-name'}, this.props.name),
        React.createElement('a', {className: 'ContactItem-email', href: 'mailto: ' + this.props.email}, this.props.email),
        React.createElement('h4', {className: 'ContactItem-description'}, this.props.description))
    )
  }
})

let ContactForm = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      React.createElement('form', {className: 'ContactForm'},
        React.createElement('input', {
          type: 'text',
          placeholder: 'Name (required)',
          value: this.props.contact.name
        }),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Email (required)',
          value: this.props.contact.email
        }),
        React.createElement('input', {
          placeholder: 'Description',
          value: this.props.contact.description
        }),
        React.createElement('button', {type: 'submit'}, 'Add Contact')
        )
    )
    }
})

let ContactView = React.createClass({
  propTypes: {
    contact: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired
  },

  render: function () {
    let contactItemElements = contacts
                          .filter(contact => { return contact.email})
                          .map(contact => {return React.createElement(ContactItem, contact)})
    return (
      React.createElement('div', {className: 'ContactView'},
        React.createElement('h1', {className: 'ContactView-title'}, "Contacts"),
        React.createElement('ul', {className: 'ContactView-list'}, contactItemElements),
        React.createElement(ContactForm, {contact: this.props.newContact})
      )
    )
  }
})


ReactDOM.render(React.createElement(ContactView, {
  contact: contacts,
  newContact: newContact
}), document.getElementById('react-app'))
