-- Add selected_package_id column to bookings table
ALTER TABLE bookings ADD COLUMN selected_package_id UUID;

-- Add foreign key constraint to pricing_packages table
ALTER TABLE bookings
ADD CONSTRAINT fk_bookings_selected_package
FOREIGN KEY (selected_package_id)
REFERENCES pricing_packages(id)
ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX idx_bookings_selected_package_id ON bookings(selected_package_id);

-- Add comment for documentation
COMMENT ON COLUMN bookings.selected_package_id IS 'Reference to the pricing package selected during booking';