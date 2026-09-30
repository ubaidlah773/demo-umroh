class CategoryModel {
  final int? id;
  final String name;

  CategoryModel({
    this.id,
    required this.name,
  });

  factory CategoryModel.fromMap(Map<String, dynamic> map) {
    return CategoryModel(
      id: map['id'] as int?,
      name: map['name'] as String,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'name': name,
    };
  }

  CategoryModel copyWith({int? id, String? name}) {
    return CategoryModel(
      id: id ?? this.id,
      name: name ?? this.name,
    );
  }
}

class UnitModel {
  final int? id;
  final String name;

  UnitModel({
    this.id,
    required this.name,
  });

  factory UnitModel.fromMap(Map<String, dynamic> map) {
    return UnitModel(
      id: map['id'] as int?,
      name: map['name'] as String,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'name': name,
    };
  }

  UnitModel copyWith({int? id, String? name}) {
    return UnitModel(
      id: id ?? this.id,
      name: name ?? this.name,
    );
  }
}
