// import { Component } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
import s from './Searchbar.module.css';

const Searchbar = ({ onSearch }) => {

const handleSearch = e => {
  e.preventDefault();
  // console.log(e.target.elements.imageName.value);
  onSearch(e.target.elements.imageName.value);
}

  return (
    <div>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSearch}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            name='imageName'
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          {/* <Toaster /> */}
        </form>
      </header>
    </div>
  );
};

// class Searchbar extends Component {
//     state = {
//         value: '',
//     }

//   handleInputValue = e => {
//         this.setState({ value: e.target.value.toLowerCase()})
//     }

//   handleSubmit = (e) => {
//         e.preventDefault();

//         if (this.state.value.trim() === '') {
//             toast.error('Input picture`s name.')
//             return;
//         }
//         this.props.onSearch(this.state.value);
//         this.resetInput();
//     }

//   resetInput = () => {
//     this.setState({ value: '' });
// }

//   render() {
//     return (
//       <div>
//         <header className={s.Searchbar}>
//           <form className={s.SearchForm} onSubmit={this.handleSubmit}>
//             <button type="submit" className={s.SearchForm_button}>
//               <span className={s.SearchForm_button_label}>Search</span>
//             </button>

//             <input
//               className={s.SearchForm_input}
//               type="text"
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//               onChange={this.handleInputValue}
//             />
//            <Toaster/>

//           </form>
//         </header>
//       </div>
//     );
//   }
// }

export default Searchbar;
