import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={css.btnContainer}>
      <button className={css.Button} onClick={onClick}>
        Load more...
      </button>
    </div>
  );
};
