import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
   state = {
      images: [],
      link: '',
      id: '',
   };

   imageFiles = (event) => {
      this.setState({
         images: event.target.files,
      });
   };

   submit = (e) => {
      e.preventDefault();

      const formData = new FormData();

      Array.from(this.state.images).forEach((image) => {
         formData.append("image", image);
      });

      axios
         .post(`https://api.imgur.com/3/image`, formData, {
            headers: {
              "Authorization": "Client-ID 044cbb8a5292c90",
            },
         })
         .then((res) => {
           //console.log(res.data.data);
           this.setState({
             link: res.data.data.link,
             id: res.data.data.id,
           });
         })
         .catch((err) => {
            console.log(err);
         });
   };


   render() {
      return (
         <div className="App">
            <form onSubmit={this.submit}>
               <input
                  type="file"
                  name="files"
                  onChange={this.imageFiles}
                  alt="image"
                  accept="image/*"
                />
               <br />
               <button type="submit">Upload</button>
            </form>

            <div className='container-img'>
               <h1>Images</h1>
               <img src={this.state.link} alt={this.state.id} className='image'/>
            </div>
         </div>
      );
   }
}

export default App;
