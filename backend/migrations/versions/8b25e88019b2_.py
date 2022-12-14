"""empty message

Revision ID: 8b25e88019b2
Revises: 
Create Date: 2022-09-05 03:29:37.735025

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b25e88019b2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('publicId', sa.String(length=500), nullable=False),
    sa.Column('firstName', sa.String(length=50), nullable=False),
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('address', sa.String(length=500), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('phoneNumber', sa.String(length=11), nullable=True),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=True),
    sa.Column('categories', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('rentPrice', sa.Float(), nullable=False),
    sa.Column('rentType', sa.String(length=20), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('product')
    op.drop_table('user')
    # ### end Alembic commands ###
