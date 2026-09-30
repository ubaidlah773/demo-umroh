class SupplierModel {
  final int? id;
  final String name;
  final String? phone;
  final String? address;
  final String? notes;
  final String createdAt;

  SupplierModel({
    this.id,
    required this.name,
    this.phone,
    this.address,
    this.notes,
    required this.createdAt,
  });

  factory SupplierModel.fromMap(Map<String, dynamic> map) {
    return SupplierModel(
      id: map['id'] as int?,
      name: map['name'] as String,
      phone: map['phone'] as String?,
      address: map['address'] as String?,
      notes: map['notes'] as String?,
      createdAt: map['created_at'] as String? ?? DateTime.now().toIso8601String(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'name': name,
      'phone': phone ?? '',
      'address': address ?? '',
      'notes': notes ?? '',
      'created_at': createdAt,
    };
  }

  SupplierModel copyWith({
    int? id,
    String? name,
    String? phone,
    String? address,
    String? notes,
    String? createdAt,
  }) {
    return SupplierModel(
      id: id ?? this.id,
      name: name ?? this.name,
      phone: phone ?? this.phone,
      address: address ?? this.address,
      notes: notes ?? this.notes,
      createdAt: createdAt ?? this.createdAt,
    );
  }
}
