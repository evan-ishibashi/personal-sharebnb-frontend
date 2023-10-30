import ShareBnbApi from "./api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ListingForm.css';
/** ListingForm: form to add new listing
 *
 * Props
 * - currUser {}
 *
 */
function ListingForm({ currUser }) {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    details: "",
    price: "",
    id: currUser.user.id
  };
  const [formData, setFormData] = useState(initialState);
  const [newListingId, setNewListingId] = useState(null);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      async function submitListing(){
        debugger
        const newListing = await ShareBnbApi.createListing(formData);
        setNewListingId(newListing.id)
      }
      submitListing()
    } catch (errs) {
      console.error(errs)

    }
  }

  function goToPhotoUploads(){
    navigate(`/listings/${newListingId}/photos`);
  }

  /** updates formData */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(curr => ({
      ...curr,
      [name]: value,
    }));
  }

  return (
    <>
    { newListingId ?
      <div>
        Listing Successfully Added!"
        <button onClick={goToPhotoUploads}>Add photos</button>

      </div>
      :
      <form onSubmit={handleSubmit} className='w-50 mt-4 mx-auto'>
        <div className='mb-3'>
          <label className="form-label" htmlFor="name"><b>Name of Area</b></label>
          <input
            aria-label="name"
            className='form-control form-control-sm'
            id="listing-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label className="form-label" htmlFor="details"><b>Details</b></label>
          <input
            aria-label="details"
            className='form-control form-control-sm'
            id="listing-details"
            name="details"
            value={formData.details}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label className="form-label" htmlFor="price"><b>Price</b></label>
          <input
            aria-label="price"
            className='form-control form-control-sm'
            id="listing-price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-info">Add your listing!</button>
      </form>
    }
    {}
    </>
  );
}

export default ListingForm;