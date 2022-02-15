import bcrypt from 'bcrypt';

class UserRepository {
    
    constructor(userDao) {
        this.userDao = userDao;
    }
    
    async findAll() {
        // findAll de sequelize
        return await this.userDao.findAll();
    }
    
    async addNew({email, password}) {
    console.log("email addNew===",email);

        const passHash = await bcrypt.hash(password, 10);
        console.log("password hashed: ", passHash);

        const user = await this.userDao.create({
          email,
          password: passHash,
        });
    }

    async findByEmail(email) {
        return await this.userDao.findOne({  where: {email: email} });
    }

    compareHash = async (password, hash) => await bcrypt.compareSync(password, hash);
}
export default UserRepository;
