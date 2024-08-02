"""add image_url

Revision ID: 2ff5a31ae6ca
Revises: 2734cd4bb02f
Create Date: 2024-08-02 15:10:51.264428

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ff5a31ae6ca'
down_revision = '2734cd4bb02f'
branch_labels = None
depends_on = None


def upgrade():
    # Add image_url to existing tables
    op.add_column('part', sa.Column('image_url', sa.String(length=500), nullable=True))
    op.add_column('service', sa.Column('image_url', sa.String(length=500), nullable=True))
    op.add_column('cart', sa.Column('image_url', sa.String(length=500), nullable=True))


def downgrade():
    # Remove image_url from existing tables
    op.drop_column('part', 'image_url')
    op.drop_column('service', 'image_url')
    op.drop_column('cart', 'image_url')
