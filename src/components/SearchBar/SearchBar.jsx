import { Formik, Form, Field } from 'formik';
import css from './SearchBar.module.css';
import magnifyingGlassSvg from './magnifyingGlass.svg';
import { toast } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();
    if (formattedSearch !== '') {
      onSubmit(formattedSearch);
      actions.resetForm();
    } else {
      toast.error('Enter your search term!');
    }
  };

  return (
    <header className={css.searchHeader}>
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <Form className={css.searchForm}>
          <button className={css.searchButton} type="submit">
            <img src={magnifyingGlassSvg} alt="Search Icon" />
          </button>
          <Field
            className={css.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
          />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
