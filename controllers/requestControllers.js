import requestModel from "../models/requestModel.js";
import fs from 'fs'

export const requestController = async (req, res) => {
  try {
    // const {
    //   productType,
    //   issueType,
    //   issueDescription,
    //   policyUpload,
    //   invoiceNumber,
    // } = req.body;

    const {productType,
      issueType,
      issueDescription,
      // policyUpload,
      invoiceNumber,} = req.fields
    const { policyUpload } = req.files;


    switch (true) {
      case !productType:
        return res.status(500).send({ error: "Product Type is required" });
      case !issueType:
        return res.status(500).send({ error: "Issue Type is required" });
      case !issueDescription:
        return res.status(500).send({ error: "Issue Description is required" });
      case !invoiceNumber:
        return res.status(500).send({ error: "Invoice Number is required" });
      case photo && photo.size < 2000000: //for 2 mb
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 2mb" });
    }


// // validation
// if (!productType) {
//     return res.status(401).send({ message: "Product Type is required" });
//   }
//   // console.log('1');
//   if (!issueType || issueType.length === 0) {
//     return res.status(401).send({ message: "Issue Type is required" });
//   }
//   if (!issueDescription) {
//     return res.status(401).send({ message: "Issue Description is required" });
//   }
//   if (!policyUpload) {
//     return res.status(401).send({ message: "Policy Upload is required" });
//   }
//   if (!invoiceNumber) {
//     return res.status(401).send({ message: "Invoice Number is required" });
//   }
//   // console.log('2');
//   // duplicacy
//   const existingCategory = await requestModel.findOne({ invoiceNumber });
//   if (existingCategory) {
//     return res.status(200).send({
//       success: true,
//       message: "Invoice Number Already Exisits",
//     });
//   }
  // console.log('3');
  // saving request
  
  
  const request = await new requestModel(req.fields).save();

  res.status(201).send({
    success: true,
    message: "Request Saved Successfuly",
    request,
  });
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting saving request",
    });
  }
};
