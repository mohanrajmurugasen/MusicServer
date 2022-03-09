module.exports = (sequelize, DataTypes) => {
  const upload = sequelize.define("upload", {
    IsrcNo: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4(),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tittle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    audio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heroine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    singerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    albumName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    musicDirector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieDirector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lyricist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feelings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    albumReleaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filmReleaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return upload;
};
