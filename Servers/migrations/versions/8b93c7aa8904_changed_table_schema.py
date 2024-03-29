"""changed table schema

Revision ID: 8b93c7aa8904
Revises: de3d79cd5a73
Create Date: 2023-04-18 12:23:16.107731

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b93c7aa8904'
down_revision = 'de3d79cd5a73'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('saved_pets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('breed', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('gender', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('organization_id', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('species', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('photo', sa.String(), nullable=True))
        batch_op.drop_column('dog_info')
        batch_op.drop_column('shelter_info')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('shelter_id', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('shelter_id')

    with op.batch_alter_table('saved_pets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('shelter_info', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('dog_info', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.drop_column('photo')
        batch_op.drop_column('species')
        batch_op.drop_column('organization_id')
        batch_op.drop_column('gender')
        batch_op.drop_column('breed')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
