import DonateModel from "../Models/donateModel.js"; 


//post donate
export const postDonate = async (req, res) => {
    const {userDonateId, donatePostId, status, donate, donateNote} = req.body;
    const newDonate = new DonateModel({userDonateId, donatePostId, status, donate, donateNote});
    console.log(newDonate);
    try {
        await newDonate.save();
        res.status(200).json(newDonate);
    } catch (error) {
        res.status(500).json(error);
    }
}

//get all donation
export const getAllDonate = async (req, res) => {
    try {
        let donates = await DonateModel.find();
        res.status(200).json(donates);
      } catch (error) {
        res.status(500).json(error);
      }
}