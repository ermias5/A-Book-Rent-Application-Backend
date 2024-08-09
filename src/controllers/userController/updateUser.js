const updateUser = async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err.message);
  }
};

export default updateUser;
