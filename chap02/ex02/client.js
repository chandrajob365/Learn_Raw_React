/*
 * Constants
 */
const CONTACT_TEMPLATE = {name: '', email: '', description: '', errors: null}

/*
 * Components
 */
let ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render: function () {
    return (
      React.createElement('li', {},
        React.createElement('div', {},
          React.createElement('h1', {}, this.props.name),
          React.createElement('a', {href: 'mailto: ' + this.props.email}, this.props.email),
          React.createElement('h3', {}, this.props.description))
    ))
  }
})

let ContactForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  onNameInput: function (e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}))
  },

  onEmailInput: function (e) {
    this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}))
  },

  onDescriptionInput: function (e) {
    this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}))
  },

  onSubmit: function (e) {
    e.preventDefault()
    this.props.onSubmit()
  },

  render: function () {
    return (
      React.createElement('form', {onSubmit: this.onSubmit, className: 'ContactForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          placeholder: 'Enter Name',
          value: this.props.value.name,
          onChange: this.onNameInput
        }),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Enter Email',
          value: this.props.value.email,
          onChange: this.onEmailInput
        }),
        React.createElement('textarea', {
          placeholder: 'Enter Description',
          value: this.props.value.description,
          onChange: this.onDescriptionInput
        }),
        React.createElement('button', {type: 'submit'}, 'Add Contact'))
    )
  }
})

let ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onNewContactChange: React.PropTypes.func.isRequired,
    onNewContactSubmit: React.PropTypes.func.isRequired
  },

  render: function () {
    let listContactItem = this.props.contacts
                          .filter(contact => { return contact.email })
                          .map(contact => { return React.createElement(ContactItem, contact) })

    return (
      React.createElement('div', {},
        React.createElement('h1', {}, 'Contacts'),
        React.createElement('ul', {}, listContactItem),
        React.createElement(ContactForm, {
          value: this.props.newContact,
          onChange: this.props.onNewContactChange,
          onSubmit: this.props.onNewContactSubmit}))
    )
  }
})

/*
 * Model
 */
// The app's complete current state
let state = {}
// Make the given changes to the state and perform any required housekeeping
function setState (contact) {
  Object.assign(state, contact)

  ReactDOM.render(React.createElement(ContactView,
    Object.assign({}, state, {
      onNewContactChange: updateNewContact,
      onNewContactSubmit: submitNewContact
    })
   ),
     document.getElementById('react-app')
  )
}

 // Set initial data
setState({
  contacts: [
    {key: 1, name: 'James K Nelson', email: 'james@jamesknelson.com', description: 'Front-end Unicorn'},
    {key: 2, name: 'Jim', email: 'jim@example.com'}
  ],
  newContact: Object.assign({}, CONTACT_TEMPLATE)
})

/*
 * Actions
 */
function updateNewContact (contact) {
  setState({newContact: contact})
  // console.log('state = ', state)
}

function submitNewContact () {
  let contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}})
  if (contact.name && contact.email) {
    setState(
      Object.keys(contact.errors).length === 0
      ? {
        newContact: Object.assign({}, CONTACT_TEMPLATE),
        contacts: state.contacts.slice(0).concat(contact)
      }
      : {newContact: contact}
    )
  }
}
