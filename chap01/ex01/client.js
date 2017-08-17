let contacts = [
  {key: 1, name: 'Manish', email: 'chandra.manish645@gmail.com', description: 'JS Intermediate'},
  {key: 2, name: 'Krishna', email: 'krishdxkle@gmail.com', description: 'SQL Expert'},
  {key: 3, name: 'Abhishek'}
]

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
      React.createElement('div', {}, this.props.description)
      )
    )
  }
})

let contactItemList = contacts
                    .filter(contact => { return contact.email })
                    .map(contact => {
                      return React.createElement(ContactItem, contact)
                    })

let rootElement = React.createElement ('div', {},
                    React.createElement('h1', {}, 'Contacts'),
                    React.createElement('ul', {}, contactItemList))

ReactDOM.render(rootElement, document.getElementById('react-app'))
