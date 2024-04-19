const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const { title } = require("process");

class deviceController {
  async create(req, res) {
    let { name, price, id, info } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv()(path.resolve(__dirname, "..", "static", fileName));
    const device = await Device.create({ name, price, id, img: fileName });

    if (info) {
      info = JSON.parse(info);
      info.forEach((i) =>
        DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: device.id,
        })
      );
    }

    return res.json(device);
  }
  async getAll(req, res) {
    const { id } = req.query;
    let devices;
    if (!id) {
      devices = await Device.findAll();
    }
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new deviceController();
