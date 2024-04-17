with open("coat1.jpeg", "rb") as f:
    image_data = f.read()

# Assuming you have a MySQL connection named 'conn'
cursor = conn.cursor()
cursor.execute("INSERT INTO images (image_data) VALUES (%s)", (image_data,))
conn.commit()
