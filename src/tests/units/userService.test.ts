import UserService from "../../modules/User/service";
import UserRepositoryMock from "../mocks/userRepository.mock";
import User from "../../modules/User/dto"

const userRepositoryMock = new UserRepositoryMock()
const userService = new UserService(userRepositoryMock);

describe("UserService unit test", () => {
  describe("add user use case", () => {
    it("should throw an error if userdata is empty or null", async () => {
      try {
        await userService.register({ email: "", password: "ee" });
      } catch (error: any) {
        expect(error.status).toBe(403);
        expect(error.message).toBe("missing email or password or both");
      }
    });

    it("expect new user with specified data", async () => {
      const user = await userService.register({
        email: "ee",
        password: "ee",
      });
      expect(user.email).toBe("ee");
      expect(user instanceof User).toBe(true);
    });
  });
});
