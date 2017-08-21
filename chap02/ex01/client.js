/*
 * Models
 */
let contacts = [
  {key: 1, name: 'Manish', email: 'chandra.manish645@gmail.com', description: 'JS Intermediate'},
  {key: 2, name: 'Krishna', email: 'krishdxkle@gmail.com', description: 'SQL Expert'},
  {key: 3, name: 'Abhishek'}
]

let newContact = {name: '', email: '', description: ''}

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
    onChange: React.PropTypes.func.isRequired
  },

  onNameInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}))
  },

  onEmailInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}))
  },

  onDescriptionInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}))
  },

  render: function () {
    // let oldData = this.props.value
    // let onChange = this.props.onChange
    return (
      React.createElement('form', {},
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
    onNewContactChange: React.PropTypes.func.isRequired
  },

  render: function () {
    let listContactItem = this.props.contacts
                          .filter(contact => { return contact.email })
                          .map(contact => { return React.createElement(ContactItem, contact) })

    return (
      React.createElement('div', {},
        React.createElement('h1', {}, 'Contacts'),
        React.createElement('ul', {}, listContactItem),
        React.createElement(ContactForm, {value: this.props.newContact,
                                          onChange: this.props.onNewContactChange}))
    )
  }
})

/*
 * Actions
 */
function updateNewContact (contact) {
  setState({newContact: contact})
  console.log('state = ', state)
}

/*
 * State
 */
 let state = {}

 function setState (contact) {
   Object.assign(state, contact)

   ReactDOM.render(React.createElement(ContactView,
     Object.assign({}, state,
       {onNewContactChange: updateNewContact})
   ),
     document.getElementById('react-app')
  )
 }

 // Set initial data
 setState({
   contacts: [
     {key: 1, name: 'James K Nelson', email: 'james@jamesknelson.com', description: 'Front-end Unicorn'},
     {key: 2, name: 'Jim', email: 'jim@example.com'},
   ],
   newContact: {name: '', email: '', description: ''},
 })
