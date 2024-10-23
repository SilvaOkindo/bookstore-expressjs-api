import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.authorization;
  let token;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1];
    //console.log(token);
  }

  if (!token) {
    res.status(400).json({ message: "No token authorization needed" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SEC);
    //console.log(decode)
    req.user = decode;
    //console.log(req.user)
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.role === "admin" ||
      req.user.role === "author" ||
      req.user.role === "user"
    ) {
      //console.log(req.user, "Inside authorization");
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  });
};

export const verifyAuthor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin" || req.user.role === "author") {
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  });
};

export const verifyUser = (req, res) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin" || req.user.role === "user") {
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  });
};

export const verifyUserOnly = (req, res) => {
  verifyToken(req, res, () => {
    if (req.user.role === "user") {
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  });
};
