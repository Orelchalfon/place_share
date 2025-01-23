export default class Place {
  #id;
  #title;
  #description;
  #imageUrl;
  #address;
  #location;
  #creator;

  constructor(id, title, description, imageUrl, address, location, creator) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.address = address;
    this.location = location;
    this.creator = creator;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    this.#title = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    this.#description = value;
  }

  get imageUrl() {
    return this.#imageUrl;
  }

  set imageUrl(value) {
    this.#imageUrl = value;
  }

  get address() {
    return this.#address;
  }

  set address(value) {
    this.#address = value;
  }

  get location() {
    return this.#location;
  }

  set location(value) {
    this.#location = value;
  }

  get creator() {
    return this.#creator;
  }

  set creator(value) {
    this.#creator = value;
  }

  static fromJson(json) {
    const place = new Place();
    place.id = json.id;
    place.title = json.title;
    place.description = json.description;
    place.imageUrl = json.imageUrl;
    place.address = json.address;
    place.location = json.location;
    place.creator = json.creator;
    return place;
  }

  static toJson(place) {
    return {
      id: place.id,
      title: place.title,
      description: place.description,
      imageUrl: place.imageUrl,
      address: place.address,
      location: place.location,

      creator: place.creator,
    };
  }

  
}
