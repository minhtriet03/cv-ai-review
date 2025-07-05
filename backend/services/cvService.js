const Cv = require("../models/cvModel"); // Import model CV

const saveCV = async ({ userId, cvUrl, fileName }) => {
  try {
    const newCV = new Cv({ userId, cvUrl, fileName });
    await newCV.save();
    return newCV;
  } catch (error) {
    throw new Error("Lỗi khi lưu CV vào database: " + error.message);
  }
};
const getCvs = async () => {
  try {
    const cvs = await Cv.find().populate("userId", "name email role").exec();
   
    return cvs;
  } catch (error) {
    console.error("Error fetching CVs:", error);
    throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi hàm
  }
};

const getByIdUser = async (id) => {
 try {
   const cvs = await Cv.find({ userId: id }).populate("userId", "name email role cvUrl").exec();
   console.log("CVs fetched successfully");
   return cvs;
 } catch (error) {
   console.error("Error fetching CVs:", error);
   throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi hàm
 }
};

const updateCv = async (id, updateData) => {
  return await Cv.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCv = async (id) => {
  return await Cv.findByIdAndDelete(id);
};

module.exports =  {saveCV, updateCv, deleteCv, getCvs,getByIdUser };
