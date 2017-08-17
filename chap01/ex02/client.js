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
      React.createElement('li', {},
        React.createElement('h2', {}, this.props.name),
        React.createElement('a', {href: 'mailto: ' + this.props.email}, this.props.email),
        React.createElement('h4', {}, this.props.description))
    )
  }
})

let ContactForm = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      React.createElement('form', {},
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

let contactItemList = contacts
                      .filter(contact => { return contact.email})
                      .map(contact => {return React.createElement(ContactItem, contact)})

var rootElement =
  React.createElement('div', {},
    React.createElement('h1', {}, 'Contacts'),
    React.createElement('ul', {}, contactItemList),
    React.createElement(ContactForm, {contact: newContact}))

ReactDOM.render(rootElement, document.getElementById('react-app'))
