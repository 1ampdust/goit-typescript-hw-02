import { Formik, Form, Field } from 'formik';
import css from './SearchBar.module.css';
import magnifyingGlassSvg from './magnifyingGlass.svg';
import { toast } from 'react-hot-toast';

type SearchBarProps = {
  onSubmit: (searchQuery: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = ({ search }: { search: string }, { resetForm }: { resetForm: () => void }) => {
    const formattedSearch = search.trim();
    if (formattedSearch !== '') {
      onSubmit(formattedSearch.toLowerCase());
      resetForm();
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
