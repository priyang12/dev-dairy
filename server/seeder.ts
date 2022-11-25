// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// // import users from "./data/userData";
// // import products from "./data/productsData";
// import { CreateModels, models } from "./utils/Models";
// import connectDB from "./loaders/mongoose";
// import server from "./server";

// dotenv.config();

// const importData = async () => {
//   await connectDB();
//   try {
//     const { User, Post, Project, ShareProject, WorkSessions } = models;

//     CreateModels();

//     server();

//     const salt = randomBytes(32);
//     const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

//     const createdUser = await User.insertMany(
//       users.map((user) => {
//         return { ...user, password: bcrypt.hashSync(user.password, 10) };
//       })
//     );

//     const adminUser = createdUser[0]._id;

//     const sampleProducts = products.map((item) => {
//       return { ...item, user: adminUser };
//     });

//     await Product.insertMany(sampleProducts);

//     await Cart.insertMany(
//       createdUser.map((user) => ({ user: user._id, products: [] }))
//     );

//     await Wishlist.insertMany(
//       createdUser.map((user) => ({ user: user._id, products: [] }))
//     );

//     console.log("DATA IMPORTED");
//     process.exit();
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// const destroyData = async () => {
//   try {
//     const { User, Post, Project, ShareProject, WorkSessions } = models;

//     await User.deleteMany();
//     await Post.deleteMany();
//     await Project.deleteMany();
//     await ShareProject.deleteMany();
//     await WorkSessions.deleteMany();

//     console.log("DATA DESTROYED");
//     process.exit();
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// if (process.argv[2] === "-d") {
//   destroyData();
// } else {
//   importData();
// }
