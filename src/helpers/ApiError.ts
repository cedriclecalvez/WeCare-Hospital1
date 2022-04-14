class ApiError extends Error {
  status: number;
  message: any;
  constructor(status: number, message:any) {
    super(message);
    this.status = status;
  }
}

export default ApiError;
