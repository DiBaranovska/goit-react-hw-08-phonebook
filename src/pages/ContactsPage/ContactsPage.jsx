import Form from '../../components/form/form';
import Filter from '../../components/filter/filter';
import Contacts from '../../components/contacts/contacts';
import { contactsSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';

const ContactsPage = () => {
  const { contacts } = useSelector(contactsSelector);
  return (
    <div
      style={{
        marginLeft: '20px',
        alignItems: 'center',
      }}
    >
      <Form />
      {contacts.length > 0 && <Filter />}
      <Contacts />
    </div>
  );
};

export default ContactsPage;
